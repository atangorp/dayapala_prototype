-- Phase 1: Database Schema for Dayapala

-- 1. Supplies Table
CREATE TABLE supplies (
    id SERIAL PRIMARY KEY,
    farmer VARCHAR(255) NOT NULL,
    commodity VARCHAR(100) NOT NULL,
    volume VARCHAR(50), -- Matches mock data format (e.g., '1.200 kg')
    village VARCHAR(100),
    price VARCHAR(100),  -- Matches mock data format (e.g., 'Rp12.600/kg')
    status VARCHAR(50) DEFAULT 'Siap divalidasi',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Demands Table
CREATE TABLE demands (
    id SERIAL PRIMARY KEY,
    buyer VARCHAR(255) NOT NULL,
    commodity VARCHAR(100) NOT NULL,
    amount VARCHAR(50), -- Matches mock data format (e.g., '1.000 kg')
    schedule VARCHAR(100),
    priority VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Matches Table (Supply-Demand Linking)
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    commodity VARCHAR(100),
    source VARCHAR(100),
    target VARCHAR(255),
    fit INTEGER CHECK (fit >= 0 AND fit <= 100),
    eta VARCHAR(100),
    credit VARCHAR(50),
    explanation TEXT,
    route TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Scores Table (Alternative Credit Scoring)
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score INTEGER CHECK (score >= 0 AND score <= 100),
    segment VARCHAR(100),
    reason TEXT,
    detail TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Audit Logs Table
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actor VARCHAR(100),
    title VARCHAR(255),
    detail TEXT,
    tag VARCHAR(50)
);

-- 6. Users Table (Authentication)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- In a real app, this should be hashed
    role VARCHAR(50) NOT NULL, -- 'koperasi', 'petani', 'vendor', 'pembiayaan'
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default admin for testing
INSERT INTO users (username, password, role, full_name) VALUES 
('admin', 'admin123', 'koperasi', 'Admin Dayapala');

-- Initial Data Migration (Optional - Based on mockData.ts)
INSERT INTO supplies (farmer, commodity, volume, village, price, status) VALUES
('Kelompok Tani Sumber Rezeki', 'Beras', '1.200 kg', 'Lamongan', 'Rp12.600/kg', 'Siap divalidasi'),
('Gapoktan Mina Sejahtera', 'Telur', '850 butir', 'Blitar', 'Rp1.900/butir', 'Butuh penjemputan'),
('KWT Mekar Pangan', 'Sayur', '470 kg', 'Mojokerto', 'Rp7.200/kg', 'Siap kirim');

-- 7. Inflation Table
CREATE TABLE inflation (
    id SERIAL PRIMARY KEY,
    commodity VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    market VARCHAR(100) NOT NULL,
    reference VARCHAR(100) NOT NULL,
    delta VARCHAR(50),
    status VARCHAR(50) -- 'Waspada', 'Normal'
);

-- 8. Notifications Table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_role VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert realistic inflation data
INSERT INTO inflation (commodity, region, market, reference, delta, status) VALUES
('Beras Medium', 'Lamongan', 'Rp12.500', 'Rp11.000', '+13.6%', 'Waspada'),
('Cabai Rawit', 'Tuban', 'Rp45.000', 'Rp40.000', '+12.5%', 'Waspada'),
('Telur Ayam', 'Bojonegoro', 'Rp26.000', 'Rp26.500', '-1.9%', 'Normal');

-- Insert initial notifications
INSERT INTO notifications (user_role, title, message) VALUES
('koperasi', 'Permintaan Baru', 'Vendor MBG mengajukan permintaan 10kg Beras.'),
('petani', 'Skor Kredit Update', 'Skor kredit Anda meningkat menjadi 85.'),
('koperasi', 'Anomali Harga', 'Harga Cabai di Tuban naik 12.5% hari ini.');
