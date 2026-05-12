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
