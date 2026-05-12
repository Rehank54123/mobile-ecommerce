"use server";
import { sql } from '@vercel/postgres';

// --- Products ---

export async function getProducts() {
  try {
    const { rows } = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    return { data: rows };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getProduct(id) {
  try {
    const { rows } = await sql`SELECT * FROM products WHERE id = ${id} LIMIT 1`;
    return { data: rows[0] };
  } catch (error) {
    return { error: error.message };
  }
}

export async function createProduct(data) {
  try {
    await sql`
      INSERT INTO products (name, category, price, description, image) 
      VALUES (${data.name}, ${data.category}, ${data.price}, ${data.description}, ${data.image})
    `;
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function updateProduct(id, data) {
  try {
    await sql`
      UPDATE products 
      SET name = ${data.name}, category = ${data.category}, price = ${data.price}, description = ${data.description}, image = ${data.image}
      WHERE id = ${id}
    `;
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function deleteProduct(id) {
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

// --- Special Offers ---

export async function getOffers() {
  try {
    const { rows } = await sql`SELECT * FROM special_offers ORDER BY created_at DESC`;
    return { data: rows };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getActiveOffers() {
  try {
    const { rows } = await sql`SELECT * FROM special_offers WHERE active = true ORDER BY created_at DESC`;
    return { data: rows };
  } catch (error) {
    return { error: error.message };
  }
}

export async function createOffer(data) {
  try {
    await sql`
      INSERT INTO special_offers (title, subtitle, description, button_text, button_link, image_url, active) 
      VALUES (${data.title}, ${data.subtitle}, ${data.description}, ${data.button_text}, ${data.button_link}, ${data.image_url}, ${data.active})
    `;
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function updateOffer(id, data) {
  try {
    await sql`
      UPDATE special_offers 
      SET title = ${data.title}, subtitle = ${data.subtitle}, description = ${data.description}, button_text = ${data.button_text}, button_link = ${data.button_link}, image_url = ${data.image_url}, active = ${data.active}
      WHERE id = ${id}
    `;
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function toggleOfferActive(id, active) {
  try {
    await sql`UPDATE special_offers SET active = ${active} WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function deleteOffer(id) {
  try {
    await sql`DELETE FROM special_offers WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

// --- Database Initialization ---
export async function initializeDatabase() {
  try {
    // 1. Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        name text NOT NULL,
        category text NOT NULL,
        price numeric(10, 2) NOT NULL,
        description text,
        image text,
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `;

    // 2. Insert initial mock products if table is empty
    const { rowCount: productsCount } = await sql`SELECT 1 FROM products LIMIT 1`;
    if (productsCount === 0) {
      await sql`
        INSERT INTO products (name, category, price, description, image) VALUES
        ('iPhone 15 Pro Max 256GB Titanium', 'telefonia', 1199.99, 'Smartphone Apple con display Super Retina XDR da 6.7", chip A17 Pro e sistema di fotocamere Pro.', 'https://images.unsplash.com/photo-1695048064972-e0f319c53641?auto=format&fit=crop&q=80&w=400'),
        ('Samsung Galaxy S24 Ultra 512GB', 'telefonia', 1349.00, 'Il top di gamma Samsung con Galaxy AI, fotocamera da 200MP e S Pen integrata.', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400'),
        ('Display LCD Compatibile iPhone 11', 'ricambi', 25.50, 'Schermo LCD di alta qualità, compatibile con Apple iPhone 11. Testato e garantito.', 'https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&q=80&w=400'),
        ('Batteria Originale Samsung S22', 'ricambi', 18.90, 'Batteria di ricambio originale (Service Pack) per Samsung Galaxy S22.', 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400'),
        ('Cover Trasparente Magsafe', 'accessori', 8.99, 'Cover in TPU trasparente con anello magnetico compatibile con accessori MagSafe.', 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&q=80&w=400')
      `;
    }

    // 3. Create special offers table
    await sql`
      CREATE TABLE IF NOT EXISTS special_offers (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        title text NOT NULL,
        subtitle text NOT NULL,
        description text NOT NULL,
        button_text text NOT NULL,
        button_link text NOT NULL,
        image_url text NOT NULL,
        active boolean DEFAULT true,
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `;

    // 4. Insert default special offer if empty
    const { rowCount: offersCount } = await sql`SELECT 1 FROM special_offers LIMIT 1`;
    if (offersCount === 0) {
      await sql`
        INSERT INTO special_offers (title, subtitle, description, button_text, button_link, image_url, active) VALUES
        ('Ingrosso Telefonia,<br/>Ricambi e Accessori.', 'B2B & B2C', 'Scopri il nostro catalogo dedicato a professionisti e privati. Prezzi competitivi, spedizioni rapide e qualità garantita.', 'Esplora Catalogo', '/products', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop', true)
      `;
    }

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
