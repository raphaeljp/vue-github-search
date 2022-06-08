<template>
    <div id="c__alert" :class="`alert__${alert.type}`">
        <p>{{ alert.msg }}</p>
        <button @click.prevent="close">x</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Alert',
    data() {
        return {
            timeout: null
        }
    },
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    created() {
        this.timeout = setTimeout(() => this.$store.commit('DISMISS_ALERT'), 4000)
    },
    beforeUnmount() {
        clearTimeout(this.timeout)
    },
    methods: {
        close() {
            this.$store.commit('DISMISS_ALERT')
        }
    }
}
</script>

<style lang="scss" scoped>
#c__alert {
    align-items: center;
    display: flex;
    justify-content: center;
    left: 0;
    min-height: 50px;
    position: fixed;
    top: 0;
    width: 100%;

    &.alert {
        &__error {
            background-color: var(--clr-error);
        }
        
        &__success {
            background-color: var(--clr-error);
        }
    }

    button {
        background-color: transparent;
        border: none;
        border-radius: 4px;
        color: var(--clr-white);
        font-size: 20px;
        outline: none;
        padding: 0.2rem 0.4rem;
        position: absolute;
        right: 16px;
        top: calc(50% - 15px);
        transition: all 0.3s ease-in-out;

        &:hover {
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.2);
        }
    }
}
</style>