'use client';
import React, { useEffect, useState } from 'react';
import { getCategories, createCategory, deleteCategory } from '@/lib/categoryApi';
import { Category } from '@/lib/constent';

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCategory({ name, slug, description });
    setName(''); setSlug(''); setDescription('');
    getCategories().then(res => setCategories(res.data));
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this category?')) {
      await deleteCategory(id);
      getCategories().then(res => setCategories(res.data));
    }
  };

  return (
    <div>
      <h1>Categories</h1>
      <form onSubmit={handleCreate}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug" required />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            {cat.name} ({cat.slug})
            <button onClick={() => handleDelete(cat.id!)}>Delete</button>
            {/* Add edit link here */}
          </li>
        ))}
      </ul>
    </div>
  );
}