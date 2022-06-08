<template>
    <div class="c__pagination">
        <button :disabled="pagination.page === 1"  @click.prevent="goPrev">
            <img src="@/assets/img/svg/icon-arrow-left.svg" alt="Previous" />
        </button>
        
        <p>
            Results {{ resultsIni }} - {{ resultsEnd }} of {{ pagination.total }}
        </p>
        
        <button :disabled="pagination.page === pagination.totalPages" @click.prevent="goNext">
            <img src="@/assets/img/svg/icon-arrow-right.svg" alt="Next" />
        </button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Pagination',
    computed: {
        resultsIni() {
            return this.pagination.page === 1
                ? 1
                : (this.pagination.perPage * (this.pagination.page - 1)) + 1
        },
        resultsEnd() {
            if (this.pagination.perPage * this.pagination.page > this.pagination.total) {
                return this.pagination.total
            }

            return this.pagination.page === 1
                ? this.pagination.perPage
                : this.pagination.perPage * this.pagination.page
        },
        ...mapState({
            pagination: state => state.github.pagination
        })
    },
    methods: {
        goNext() {
            if (this.pagination.page === this.pagination.totalPages) return
            this.paginateRepositories(this.pagination.page + 1)
        },
        goPrev() {
            if (this.pagination.page === 1) return
            this.paginateRepositories(this.pagination.page - 1)
        },
        ...mapActions('github', [
            'paginateRepositories',
        ])
    }
}
</script>

<style lang="scss" scoped>
.c__pagination {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    margin: 40px 0;

    button {
        background: none;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        padding: 4px 12px;
        transition: all ease-in-out 0.2s;

        img {
            width: 20px;
        }

        &:hover {
            &:not(:disabled) {
                background: rgba(255, 255, 255, 0.4)
            }
            
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

    p {
        margin: 0 20px;
    }
}
</style>