<script setup lang="ts">
import { useUser } from '~/stores/UserStore';

const supabase = useSupabaseClient();
const route = useRoute();
const userStore = useUser();
let isActive = (name: string) => route.name == name;

async function signOut() {
    await supabase.auth.signOut();
    blur();
}

function blur() {
    (document.activeElement as HTMLElement).blur();
}

supabase.auth.onAuthStateChange(async (event, session) => {
    if (event == 'SIGNED_OUT') userStore.signOut();
    if (event == 'SIGNED_IN' || event == 'INITIAL_SESSION') await userStore.signIn(session?.user);
});

</script>
<template>
    <div class="navbar bg-base-300 rounded-b-3xl shadow">
        <div class="navbar-start">
            <div class="dropdown" id="menu-dropdown">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </label>
                <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52">
                    <li>
                        <NuxtLink class="nav-link" :class="{ 'bg-base-100': isActive('index') }" aria-current="page" to="/"
                            @click="blur">Home</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="nav-link" :class="{ 'bg-base-100': isActive('about') }" to="/about" @click="blur">About
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="nav-link" :class="{ 'bg-base-100': isActive('medidores') }" to="/medidores" @click="blur">Medidores
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="navbar-center">
            <NuxtLink class="btn btn-ghost normal-case text-xl" to="/">Supabase</NuxtLink>
        </div>
        <div class="navbar-end">
            <DarkToggle />
            <div class="dropdown dropdown-end" v-if="userStore.authenticated">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <div class="avatar" v-if="userStore.has_avatar">
                        <div class="w-10 rounded-full">
                            <img :src="userStore.avatar_url" />
                        </div>
                    </div>
                    <div class="avatar placeholder" v-else>
                        <div class="bg-neutral-focus text-neutral-content rounded-full w-10">
                            <span class="text-xl">{{ userStore.first_letter }}</span>
                        </div>
                    </div>
                </label>
                <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52">
                    <li>
                        <NuxtLink class="nav-link" :class="{ 'bg-base-100': isActive('profile') }" aria-current="page" to="/profile"
                            @click="blur">Profile</NuxtLink>
                    </li>
                    <li>
                        <div class="nav-link" to="/login" @click="signOut">Logout</div>
                    </li>
                </ul>
            </div>
            <NuxtLink v-else class="btn rounded-full" to="/login">Login</NuxtLink>
        </div>
</div></template>