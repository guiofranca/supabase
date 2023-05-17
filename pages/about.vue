<script setup lang="ts">
import { useCounter } from '~/stores/CounterStore';
import { useTheme } from '~/stores/ThemeStore';

//const counter = useState('counter', () => Math.round(Math.random() * 1000))
const counter = useCounter();
let login = {
    email: "user@example.com",
    password: "123@ABCabc"
}

const themeStore = useTheme();


</script>
<template>
    <div>
        Counter: {{ counter.n }}
        <button class="btn btn-secondary" @click="counter.increment()">
            +
        </button>
        <button class="btn btn-secondary" @click="counter.decrement()">
            -
        </button>
        <button class="btn btn-secondary" @click="themeStore.toggle()">login</button>
        <br>
        <form @submit.prevent="">
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input type="text" class="input bg-secondary input-bordered" name="email" v-model="login.email">
            </div>

            <div class="form-control">
                <label class="label">
                    <span class="label-text">Password</span>
                </label>
                <input type="text" class="input" name="password" v-model="login.password">
            </div>

            <div class="form-control">
                <br>
                <button type="submit" class="btn" :title="login.password">Submit</button>
            </div>
        </form>
    </div>
</template>