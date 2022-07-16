const app = Vue.createApp({
    data() {
        var a = 10
        return {
            total_hits: a,
            current_hit: 1,
            current_lang: '',
            hits_data: null,
        }
    },
    methods: {
        language_button_click(event) {
            console.log(this.current_lang)
            if (this.current_lang === "") {
                $(".language-button").removeClass("select-lang");
                $(event.target).addClass("select-lang");
                var lang = $(event.target).attr("data-lang");
                // change visibility of  $('.confirm-language[data-lang=' + lang + ']')
                $('.confirm-language').css('visibility', 'hidden');
                $('.confirm-language[data-lang=' + lang + ']').css('visibility', 'visible');
                // $("")
            }
        },
        confirm_lang(lang) {
            this.current_lang = lang
        },
        next_hit() {
            this.current_hit = this.current_hit + 1
            if (this.current_hit > this.total_hits) {
                this.current_hit = this.total_hits
            }
        },
        prev_hit() {
            this.current_hit = this.current_hit - 1
            if (this.current_hit < 1) {
                this.current_hit = 1
            }
        }
    },
    mounted() {
        $(".language-button").on("click", this.language_button_click)
        $(".confirm-language").on("click", function () {
            $('.confirm-language').hide();
            $('.language-button').removeClass("language-button");;
            // $('.language-button').hide();
            $("#task").show(200);
        });
        if (this.current_lang != "") {
            console.log(this.current_lang)
            axios 
            .get(`https://raw.githubusercontent.com/Yao-Dou/multipit_multilingual/main/data/jul_3-13_language_dict_with_sort_and_num_selection_${this.current_lang}.json`)
            .then(response => (this.hits_data = response))
            console.log(this.hits_data)
        }
    }
})


app.mount('#app')