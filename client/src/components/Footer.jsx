import React from 'react';

export default function Footer() {
    return (
        <footer class="bg-slate-950/20 rounded-base shadow-xs border border-default border-slate-900  m-4 text-white">
            <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span class="text-sm text-body sm:text-center">© 2026 <a href="/" class="hover:underline">MOKOPA™</a>. All Rights Reserved.
                </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">
                    <li>
                        <a href="http://localhost:5173/register" class="hover:underline me-4 md:me-6">Ahmed</a>
                    </li>
                    <li>
                        <a href="http://localhost:5173/product/69fe01af6253a066b631baee" class="hover:underline me-4 md:me-6">Ashraf</a>
                    </li>
                    <li>
                        <a href="http://localhost:5173/cart" class="hover:underline me-4 md:me-6">David</a>
                    </li>
                    <li>
                        <a href="http://localhost:5000/api/products" class="hover:underline me-4 md:me-6">Mahmoud</a>
                    </li>
                    <li>
                        <a href="http://localhost:5173/product" class="hover:underline">Mostafa</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
