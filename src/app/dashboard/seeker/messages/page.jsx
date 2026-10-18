"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Magnifier, 
  PaperPlane, 
  Paperclip, 
  CircleFill, 
  Check, 
  ChevronDown 
} from "@gravity-ui/icons";

// Mock conversation list data between seeker and recruiters
const initialConversations = [
  {
    id: "1",
    recruiterName: "Sarah Jenkins",
    company: "Acme Technologies",
    role: "Account Executive",
    avatar: "https://i.ibb.co.com/4gVmnzZb/89491ed0ef83.png",
    unread: 2,
    online: true,
    lastMessage: "That sounds great! Are you available for a quick introductory call this Thursday?",
    time: "10:45 AM",
    messages: [
      { id: "m1", sender: "recruiter", text: "Hi seeker, we reviewed your application for the Account Executive role and were really impressed.", time: "10:30 AM" },
      { id: "m2", sender: "recruiter", text: "That sounds great! Are you available for a quick introductory call this Thursday?", time: "10:45 AM" },
    ]
  },
  {
    id: "2",
    recruiterName: "Michael Chang",
    company: "Katappa Corp",
    role: "Frontend Developer",
    avatar: "https://i.ibb.co.com/4gVmnzZb/89491ed0ef83.png",
    unread: 0,
    online: false,
    lastMessage: "Thanks for submitting your portfolio link. We will get back to you soon.",
    time: "Yesterday",
    messages: [
      { id: "m1", sender: "recruiter", text: "Thanks for submitting your portfolio link. We will get back to you soon.", time: "Yesterday" }
    ]
  },
  {
    id: "3",
    recruiterName: "Elena Rostova",
    company: "Nexus Global",
    role: "Product Manager",
    avatar: "https://i.ibb.co.com/4gVmnzZb/89491ed0ef83.png",
    unread: 0,
    online: true,
    lastMessage: "Looking forward to seeing your case study presentation.",
    time: "Oct 16",
    messages: [
      { id: "m1", sender: "recruiter", text: "Looking forward to seeing your case study presentation.", time: "Oct 16" }
    ]
  }
];

export default function SeekerMessagesPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeChatId, setActiveChatId] = useState(initialConversations[0].id);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeChat = conversations.find((c) => c.id === activeChatId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const updated = conversations.map((chat) => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          lastMessage: newMessage,
          time: "Just now",
          messages: [
            ...chat.messages,
            {
              id: Date.now().toString(),
              sender: "seeker",
              text: newMessage,
              time: "Just now"
            }
          ]
        };
      }
      return chat;
    });

    setConversations(updated);
    setNewMessage("");
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.recruiterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-2 sm:p-4 md:p-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto h-[calc(100vh-3rem)] sm:h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Sidebar: Conversation List */}
        <div className="md:col-span-4 lg:col-span-3 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
          
          {/* Sidebar Header & Search */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                Messages
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                {conversations.length} Active
              </span>
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Magnifier width={16} height={16} aria-hidden="true" />
              </span>
              <input
                type="text"
                placeholder="Search recruiters or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((chat) => {
                const isActive = chat.id === activeChatId;
                return (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`w-full p-4 text-left transition-colors flex items-start gap-3 relative ${
                      isActive 
                        ? "bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-blue-600" 
                        : "hover:bg-slate-100/60 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    {/* Avatar with online status */}
                    <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-blue-100 dark:bg-blue-900 shrink-0">
                      <Image
                        src={chat.avatar}
                        alt={chat.recruiterName}
                        fill
                        className="object-cover"
                      />
                      {chat.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                      )}
                    </div>

                    {/* Chat Preview info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {chat.recruiterName}
                        </h2>
                        <span className="text-[10px] text-slate-400 shrink-0">{chat.time}</span>
                      </div>
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400 truncate">
                        {chat.company} • {chat.role}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">
                        {chat.lastMessage}
                      </p>
                    </div>

                    {/* Unread badge */}
                    {chat.unread > 0 && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                        {chat.unread}
                      </span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                No conversations found.
              </div>
            )}
          </div>
        </div>

        {/* Right Main Chat Window */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col bg-white dark:bg-slate-900">
          
          {/* Active Chat Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-blue-100 dark:bg-blue-900">
                <Image
                  src={activeChat.avatar}
                  alt={activeChat.recruiterName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  {activeChat.recruiterName}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Recruiting for <span className="font-medium text-blue-600 dark:text-blue-400">{activeChat.role}</span> at {activeChat.company}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Hiring Loop
              </span>
            </div>
          </div>

          {/* Message History Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 dark:bg-slate-950/20">
            {activeChat.messages.map((msg) => {
              const isSeeker = msg.sender === "seeker";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isSeeker ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-md rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed ${
                      isSeeker
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Attach file"
                className="p-2.5 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Paperclip width={20} height={20} aria-hidden="true" />
              </button>

              <input
                type="text"
                placeholder="Type your message to the recruiter..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
              />

              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span className="hidden sm:inline mr-2">Send</span>
                <PaperPlane width={18} height={18} aria-hidden="true" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}