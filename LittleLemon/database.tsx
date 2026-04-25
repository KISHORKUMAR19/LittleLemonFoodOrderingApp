import * as SQLite from 'expo-sqlite';
import { MenuItemDisplay, MenuItemRow } from './types';


const db = SQLite.openDatabaseAsync('LittleLemonGo.db');


//Menu Items table

export async function createTable(){
    try{
        const database = await db;
        await database.execAsync(
            `PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS menuitems(
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                title TEXT NOT NULL,
                price TEXT NOT NULL,
                description TEXT NOT NULL,
                image TEXT NOT NULL,
                category TEXT NOT NULL
                 );
        `);
    }catch (error){
        console.error('Error creating table:', error);
    }
}

// Retrive all menu items 

export async function getMenuItems(){
    try{
        const database = await db;
        const statement = await database.prepareAsync(`SELECT * FROM menuitems`);
        const result = await statement.executeAsync();
        const menuItems = await result.getAllAsync() as MenuItemRow[];
        await statement.finalizeAsync();
        return menuItems;
    }catch (error){
        console.error('Error retrieving menu items:', error);
    }
    }

// Save all items
export async function saveMenuItems(menuItems: Omit<MenuItemRow,'id'>[]){
  const database = await db;
  
  try {
    await database.execAsync('BEGIN TRANSACTION');
    
    // Clear existing items to prevent duplicates
    await database.execAsync('DELETE FROM menuitems');
    
    const sql = `INSERT INTO menuitems (title, price, description, image, category)
                 VALUES (?, ?, ?, ?, ?)`;
    
    for (const item of menuItems) {
      await database.runAsync(sql,[
        item.title,
        item.price,
        item.description,
        item.image,
        item.category
      ]);
    }
    
    await database.execAsync('COMMIT');
  } catch (error) {
    await database.execAsync('ROLLBACK');
    console.error('Error saving menu items:', error);
  }
}

// filter menu items by category a Query string and list of categories

export async function filterMenuItemsByCategory(query: string, activeCategories: string[]
): Promise <MenuItemDisplay[]> { // changed return type
    try {
        const database = await db;
        let sql: string;
        let params: any[] = [];

        const activeCategoriesLower = activeCategories.map(c => c.toLowerCase());

        if (activeCategories.length === 0) {
            sql = `SELECT * FROM menuitems WHERE LOWER(title) LIKE ?`;
            params = [`%${query.toLowerCase()}%`];
        }else {

            const placeholders = activeCategoriesLower.map(()=>'?').join(',');
            sql =`SELECT * FROM menuitems
                WHERE LOWER(title)LIKE ? AND LOWER(category) IN (${placeholders})`;

            params = [`%${query.toLowerCase()}%`, ...activeCategoriesLower
                
            ];
        }

        const statement  = await database.prepareAsync(sql);
        const result = await statement.executeAsync(params);
        const menuItems = await result.getAllAsync() as MenuItemRow[];
        

        //Map to ddisplay type
        const displayItems: MenuItemDisplay[]= menuItems.map(item=>({           
            title: item.title,
            price: item.price,
            description: item.description,
            image:item.image,
            category : item.category
        }));

        await statement.finalizeAsync();      
        return displayItems;
    }catch (error){
        console.error('Error filtering menu items:', error);
        return[];
    }

}

    
        