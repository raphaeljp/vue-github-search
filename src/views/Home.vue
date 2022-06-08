<template>
    <Transition name="fade">
        <alert v-if="showAlert" />
    </Transition>

    <div class="container">
        <p class="app__description">
            Welcome to the GitHub Repository Search App! <br />
            You can search for repositories by typing in the search box below. <br />
            Use the name of the owner followed by the repository as shown in the example below. <br>
            <code>vuejs/vue</code>
        </p>

        <search-form />
        <repositories-list />
    </div>
</template>

<script>
import Alert from '../components/ui/Alert.vue'
import SearchForm from '@/components/SearchForm.vue'
import RepositoriesList from '@/components/RepositoriesList.vue'

import { mapState } from 'vuex'

export default {
    name: 'Home',
    components: {
        Alert,
        SearchForm,
        RepositoriesList
    },
    computed: {
        ...mapState({
            showAlert: state => state.alert.active
        })
    }
}
</script>

<style lang="scss">
.app__description {
    display: block;
    line-height: 24px;
    margin: 40px auto;
    max-width: 600px;
    text-align: center;

    code {
        display: block;
        margin-top: 14px;
    }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>