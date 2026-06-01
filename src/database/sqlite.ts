import { BusinessCard } from '@/types';
import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('business_cards.db');

export const initDb = () => {
    db.execSync(`
    CREATE TABLE IF NOT EXISTS business_cards (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      title TEXT,
      company TEXT,
      phone TEXT,
      email TEXT,
      website TEXT,
      address TEXT,
      linkedin TEXT,
      twitter TEXT,
      facebook TEXT,
      instagram TEXT,
      profileImage TEXT,
      companyLogo TEXT,
      theme TEXT,
      template TEXT,
      createdAt INTEGER,
      updatedAt INTEGER,
      isFavorite INTEGER DEFAULT 0
    );
  `);
};

export const CardRepository = {
    getAll: (): BusinessCard[] => {
        return db.getAllSync<BusinessCard>('SELECT * FROM business_cards ORDER BY createdAt DESC');
    },

    add: (card: BusinessCard) => {
        const statement = db.prepareSync(
            `INSERT INTO business_cards (id, name, title, company, phone, email, website, address, linkedin, twitter, facebook, instagram, profileImage, companyLogo, theme, template, createdAt, updatedAt, isFavorite) 
      VALUES ($id, $name, $title, $company, $phone, $email, $website, $address, $linkedin, $twitter, $facebook, $instagram, $profileImage, $companyLogo, $theme, $template, $createdAt, $updatedAt, $isFavorite)`
        );
        statement.executeSync({
            $id: card.id, $name: card.name, $title: card.title || '', $company: card.company || '', $phone: card.phone || '', $email: card.email || '', $website: card.website || '', $address: card.address || '', $linkedin: card.linkedin || '', $twitter: card.twitter || '', $facebook: card.facebook || '', $instagram: card.instagram || '', $profileImage: card.profileImage || '', $companyLogo: card.companyLogo || '', $theme: card.theme || 'default', $template: card.template || 'corporate', $createdAt: card.createdAt, $updatedAt: card.updatedAt, $isFavorite: card.isFavorite ? 1 : 0
        });
    },

    update: (id: string, card: Partial<BusinessCard>) => {
        const current = db.getFirstSync<BusinessCard>('SELECT * FROM business_cards WHERE id = ?', id);
        if (!current) return;
        const updated = { ...current, ...card, updatedAt: Date.now() };
        const statement = db.prepareSync(
            `UPDATE business_cards SET name = $name, title = $title, company = $company, phone = $phone, email = $email, website = $website, address = $address, linkedin = $linkedin, twitter = $twitter, facebook = $facebook, instagram = $instagram, profileImage = $profileImage, companyLogo = $companyLogo, theme = $theme, template = $template, updatedAt = $updatedAt WHERE id = $id`
        );
        statement.executeSync({
            $id: id, $name: updated.name, $title: updated.title, $company: updated.company, $phone: updated.phone, $email: updated.email, $website: updated.website, $address: updated.address, $linkedin: updated.linkedin, $twitter: updated.twitter, $facebook: updated.facebook, $instagram: updated.instagram, $profileImage: updated.profileImage, $companyLogo: updated.companyLogo, $theme: updated.theme, $template: updated.template, $updatedAt: updated.updatedAt
        });
    },

    delete: (id: string) => {
        db.runSync('DELETE FROM business_cards WHERE id = ?', id);
    },

    toggleFavorite: (id: string, isFavorite: boolean) => {
        db.runSync('UPDATE business_cards SET isFavorite = ? WHERE id = ?', isFavorite ? 1 : 0, id);
    }
};