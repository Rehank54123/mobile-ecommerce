-- Create the products table
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  price numeric(10, 2) NOT NULL,
  description text,
  image text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert initial mock products
INSERT INTO products (name, category, price, description, image) VALUES
('iPhone 15 Pro Max 256GB Titanium', 'telefonia', 1199.99, 'Smartphone Apple con display Super Retina XDR da 6.7", chip A17 Pro e sistema di fotocamere Pro.', 'https://placehold.co/400x400/ffffff/0056b3?text=iPhone+15+Pro'),
('Samsung Galaxy S24 Ultra 512GB', 'telefonia', 1349.00, 'Il top di gamma Samsung con Galaxy AI, fotocamera da 200MP e S Pen integrata.', 'https://placehold.co/400x400/ffffff/0056b3?text=Galaxy+S24'),
('Display LCD Compatibile iPhone 11', 'ricambi', 25.50, 'Schermo LCD di alta qualità, compatibile con Apple iPhone 11. Testato e garantito.', 'https://placehold.co/400x400/ffffff/0056b3?text=LCD+iPhone+11'),
('Batteria Originale Samsung S22', 'ricambi', 18.90, 'Batteria di ricambio originale (Service Pack) per Samsung Galaxy S22.', 'https://placehold.co/400x400/ffffff/0056b3?text=Batteria+S22'),
('Cover Trasparente Magsafe', 'accessori', 8.99, 'Cover in TPU trasparente con anello magnetico compatibile con accessori MagSafe.', 'https://placehold.co/400x400/ffffff/0056b3?text=Cover+MagSafe'),
('Caricabatterie GaN 65W Type-C', 'accessori', 19.90, 'Alimentatore ultra compatto da 65W, doppia porta USB-C e porta USB-A.', 'https://placehold.co/400x400/ffffff/0056b3?text=GaN+65W'),
('Micro SD Kingston 128GB Canvas', 'memorie', 12.50, 'Scheda di memoria MicroSDXC da 128GB, classe 10 UHS-I, ideale per smartphone.', 'https://placehold.co/400x400/ffffff/0056b3?text=Micro+SD+128GB');

-- Create the special offers table for the hero slider
CREATE TABLE special_offers (
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

-- Insert a default special offer
INSERT INTO special_offers (title, subtitle, description, button_text, button_link, image_url, active) VALUES
('Ingrosso Telefonia,<br/>Ricambi e Accessori.', 'B2B & B2C', 'Scopri il nostro catalogo dedicato a professionisti e privati. Prezzi competitivi, spedizioni rapide e qualità garantita.', 'Esplora Catalogo', '/products', 'https://placehold.co/400x400/e9ecef/6c757d?text=Hero+Image', true);
