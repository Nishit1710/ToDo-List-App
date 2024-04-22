"use client";

import { useEffect, useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";
import Link from "next/link";

export default function Page() {
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const { user, firebaseSignOut } = useUserAuth();

  function handleItemSelect(item) {
    if (item && item.name) {
      const cleanedItemName = item.name
        .split(",")[0] // Remove the size
        .replace(
          /[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]/g,
          ""
        ) // Remove the emoji
        .trim();
      setSelectedItemName(cleanedItemName);
    }
  }
  
  async function handleAddItem(newItem) {
    const newItemWithId = { ...newItem, id: await addItem(user.uid, newItem) };
    setItems([...items, newItemWithId]);
  }

  async function loadItems() {
    const items = await getItems(user.uid);
    setItems(items);
  }

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  return user ? (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Shopping List</h1>
        <div className="pr-2">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
      </div>
      <div className="w-1/2 pl-2">
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  ) : (
    <Link href="./" className="flex text-xl m-8">Go Back and Sign In</Link>
  );
}
