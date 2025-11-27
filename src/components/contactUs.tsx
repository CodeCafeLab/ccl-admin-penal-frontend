"use client";
import { ContactMessage } from "@/lib/contactUS";
import React, { useEffect, useState } from "react";
import apiclient from "@/lib/axios";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    apiclient.get("/contact").then(res => setMessages(res.data));
  }, []);
  return (
    <div>
      <h1>Contact Messages</h1>
      <ul>
        {messages.map((msg: ContactMessage) => (
          <li key={msg.id}>
            <b>{msg.name}</b> ({msg.email}): {msg.subject} <br /> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}