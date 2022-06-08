<template>
    <div class="c__search-form">
        <div :class="['c__search-form__input-group', { 'invalid': invalidForm }]">
            <input
                type="text"
                placeholder="vuejs/vue"
                v-model="query"
                @blur="v$.query.$touch"
                @keydown.enter="submit"
            />
            
            <button @click="submit" :disabled="v$.query.$invalid">
                <img src="@/assets/img/svg/icon-search.svg" alt="Search Icon" />
            </button>
        </div>

        <span v-if="invalidForm">
            * Please enter a valid search term.
        </span>
        
        <p>
            <strong>Hint:</strong> you can use <code>*</code> as a wildcard in the beginning
            and in the end of your query to search for all repositories with the given word
            in their name. e.g., <code>*vue*</code>
        </p>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'SearchForm',
    setup () {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            query: ''
        }
    },
    computed: {
        invalidForm() {
            return this.v$.query.$dirty && this.v$.query.$invalid
        },
        ...mapState({
            isLoading: state => state.github.loading
        })
    },
    methods: {
        submit() {
            if (this.v$.query.$invalid) return

            const payload = {
                type: this.queryType(this.query),
                name: this.query
            }

            if (payload.type === 'wildcard') return this.searchRepositories(payload)

            return this.fetchRepository(payload)
        },
        queryType(value) {
            return value.startsWith('*') && value.endsWith('*')
                ? 'wildcard'
                : 'exact'
        },
        ...mapActions('github', [
            'searchRepositories',
            'fetchRepository'
        ])
    },
    validations() {
        return {
            query: {
                required,
                validQuerySyntax: (value) => {      
                    const validWildcard = value.length > 3 && value.startsWith('*') && value.endsWith('*')
                    
                    // regex to validate if `exact` query starts with at least one valid character,
                    // is separated by an slash and ends with at least one valid character.
                    const regex = /^[a-zA-Z0-9_.-]{1,}\/[a-zA-Z0-9_.-]{1,}$/
                    const validExact = regex.test(value)
                    
                    return validWildcard || validExact
                }
            }
        };
    },
}
</script>

<style lang="scss" scoped>
.c__search-form {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__input-group {
        background-color: var(--clr-white);
        border: 2px solid var(--clr-primary-dark);
        border-radius: 8px;
        height: 50px;
        position: relative;
        max-width: 600px;
        overflow: hidden;
        width: 100%;
        &.invalid {
            border-color: var(--clr-error);
        }

        input {
            background-color: transparent;
            border: none;
            height: 100%;
            outline: none;
            padding: 0 12px;
            width: calc(100% - 60px);
        }

        button {
            background: transparent;
            cursor: pointer;
            position: absolute;
            right: 12px;
            top: calc(50% - 10px);

            img {
                height: 20px;
                width: 20px;
            }

            &:disabled {
                opacity: 0.4;
            }
        }
    }

    span {
        color: var(--clr-error);
        display: block;
        font-size: 12px;
        margin-top: 4px;
        max-width: 600px;
        width: 100%;
    }

    p {
        line-height: 24px;;
        margin-top: 16px;
        max-width: 600px;
        width: 100%;
    }
}
</style>