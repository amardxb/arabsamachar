"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaFacebook, FaTelegram, FaLink, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Share({ url, title = "" }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    } finally {
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="share-component flex flex-row gap-4 items-center mt-3">
      
      {/* Facebook */}
      <Link
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="share-button share-facebook"
        title="Share on Facebook"
      >
        <FaFacebook size={20} color="#1877F2" />
      </Link>

      {/* Twitter (X) */}
      <Link
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="share-button share-twitter"
        title="Share on X"
      >
        <FaXTwitter size={20} color="#000000" />
      </Link>

      {/* Telegram */}
      <Link
        href={shareLinks.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="share-button share-telegram"
        title="Share on Telegram"
      >
        <FaTelegram size={20} color="#0088cc" />
      </Link>

      {/* WhatsApp */}
      <Link
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="share-button share-whatsapp"
        title="Share on WhatsApp"
      >
        <FaWhatsapp size={20} color="#25D366" />
      </Link>

      {/* Copy Link */}
      <button
        className={`share-button share-copy ${copied ? "copied" : ""}`}
        title="Copy Link"
        onClick={copyToClipboard}
      >
        <FaLink size={20} color="black" />
        {copied && <span className="ml-1 text-xs">Copied!</span>}
      </button>

    </div>
  );
}