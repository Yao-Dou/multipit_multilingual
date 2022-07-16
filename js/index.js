const app = Vue.createApp({
    data() {
        var a = 10
        return {
            total_hits: a,
            current_hit: 1,
            current_lang: '',
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
            $.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20WHERE%20symbol%3D%27WRC%27&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback', function(data) {
                // JSON result in `data` variable
            });
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
    }
})


app.mount('#app')