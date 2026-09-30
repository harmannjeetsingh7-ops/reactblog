'use client';

import { useEffect } from "react";

export default function PageTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = `${title} - COMP2112`;
  }, [title]);  

  // must return empty value as a tsx component
  return null;
}