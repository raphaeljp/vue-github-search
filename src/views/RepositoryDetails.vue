<template>
    <main class="container page__repository-details">
        <h1>{{ repository.full_name }}</h1>
        <p>{{ repository.description }}</p>

        <article>
            <h3>Contributors</h3>

            <section class="contributors__list">
                <div
                    v-for="(contributor, i) in contributors.results"
                    :key="i"
                    class="contributors__list__item"
                >
                    <img :src="contributor.avatar_url" :alt="contributor.login" />
                    <a :href="contributor.html_url" :title="contributor.login" target="__blank">
                        {{ contributor.login }}
                    </a>
                </div>
            </section>

            <section class="contributors__list__loader" v-if="loadingContributors">
                <img src="@/assets/img/svg/loader.svg" />
            </section>

            <button
                v-if="page !== contributors.pages"
                @click.prevent="fetchMoreContributors"
                :disabled="loadingContributors"
                class="unselectable"
            >
                Load more contributors
            </button>
        </article>
    </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'RepositoryDetails',
    data() {
        return {
            contributors: {},
            page: 1
        }
    },
    computed: {
        ...mapState({
            repository: state => state.github.selectedRepository,
            loadingContributors: state => state.github.loading.contributors,
        })
    },
    created() {
        const { owner, name } = this.$route.params
        if (!this.repository) this.fetchRepository({ type: 'exact', name: `${owner}/${name}` })

    },
    async mounted() {
        const { owner, name } = this.$route.params
        this.contributors = await this.listRepositoryContributors({ owner, name })
    },
    beforeUnmount() {
        this.resetSelectedRepository()
    },
    methods: {
        async fetchMoreContributors() {
            if (this.page === this.contributors.pages) return
            
            this.page++

            const { owner, name } = this.$route.params
            const data = await this.listRepositoryContributors({ owner, name, page: this.page })
            this.contributors.results.push(...data.results)
        },
        ...mapActions('github', [
            'fetchRepository',
            'listRepositoryContributors',
            'resetSelectedRepository'
        ])
    }
}
</script>

<style lang="scss">
.page__repository-details {
    article {
        margin: 40px 0 80px;

        h3 {
            margin-bottom: 16px;
        }

        .contributors__list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 12px;

            &__item {
                color: var(--clr-white);
                padding: 12px;
                text-align: center;
                width: 120px;

                img {
                    border: solid 1px var(--clr-grey);
                    border-radius: 100%;
                    height: 60px;
                    margin-bottom: 6px;
                    width: 60px;
                }

                a {
                    color: var(--clr-white);
                    display: block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 100%;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            &__loader {
                text-align: center;
                width: 100%;

                img {
                    height: 60px;
                    width: 60px;
                }
            }
        }

        button {
            background: transparent;
            color: var(--clr-secondary);
            display: block;
            margin: 40px auto;

            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
}
</style>