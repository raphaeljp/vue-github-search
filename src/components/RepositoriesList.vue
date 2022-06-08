<template>
    <div class="c__repositoryes-list">
        <div v-if="isLoading" class="c__repositoryes-list__loader">
            <img src="@/assets/img/svg/loader.svg" alt="Loading...">
        </div>
        
        <p v-else-if="repositories && !repositories.length" class="c__repositoryes-list__no-results">
            No repositories found for the query <strong>{{ query }}</strong>
        </p>

        <div v-else class="c__repositoryes-list__results">
            <div
                v-for="repository in repositories"
                :key="repository.id"
                class="c__repositoryes-list__results__item"
            >
                <h6 :title="repository.full_name">{{ repository.full_name }}</h6>

                <p>{{ repository.description }}</p>

                <div class="c__repositoryes-list__results__item__actions">
                    <router-link
                        :to="{ name: 'Details', params: { owner: repository.owner.login, name: repository.name } }"
                    >
                        Contributors
                    </router-link>

                    <a class="muted" :href="repository.html_url" target="_blank">See on GitHub</a>
                </div>
            </div>
        </div>

        <pagination v-if="repositories && repositories.length" />
    </div>
</template>

<script>
import Pagination from '@/components/base/Pagination.vue'
import { mapState } from 'vuex'

export default {
    name: 'RepositoriesList',
    components: { Pagination },
    computed: {
        ...mapState({
            isLoading: state => state.github.loading.repoList,
            error: state => state.github.error,
            repositories: state => state.github.repositories,
            query: state => state.github.search.name,
        })
    }
}
</script>

<style lang="scss" scoped>
.c__repositoryes-list {
    margin-top: 40px;

    &__loader {
        margin: 40px auto;
        text-align: center;
        
        img {
            height: 100px;
            width: 100px;
        }
    }

    &__no-results {
        margin-top: 80px;
        text-align: center;
        width: 100%;
    }

    &__results {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 12px;

        &__item {
            background: var(--clr-white);
            border-radius: 8px;
            color: var(--clr-grey-dark);
            padding: 12px;
            width: 300px;

            h6 {
                display: -webkit-box;
                margin-bottom: 12px;
                overflow: hidden;
                -webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
            }

            p {
                color: var(--clr-grey);
                display: -webkit-box;
                font-size: 14px;
                line-height: 20px;
                margin-bottom: 8px;
                min-height: 40px;
                overflow: hidden;
                -webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
            }

            &__actions {
                display: flex;
                justify-content: space-between;
                margin-top: 12px;

                a {
                    color: var(--clr-primary-dark);
                    font-size: 12px;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>