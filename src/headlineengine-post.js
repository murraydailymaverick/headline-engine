import "./headlineengine-post-style.scss";
import calc_score from "./headlineengine-score";

async function main() {
    async function display_analysis(container) {
        const title = jQuery("#title").val();
        if (!title) {
            container.html("");
            return;
        }
        const score = await calc_score(title);
        const score_el = jQuery(`
        <div class='headlineengine-score'>
            <div class='headlineengine-score-value headlineengine-score-value-${score.rating}'>${ Math.floor(score.total_score * 100) }</div>
            <div class='headlineengine-score-title'>HeadlineEngine<br>Score</div>
        </div>`);
        const analysis = jQuery(`<div class="headlineengine-analysis">
            <div class="headlineengine-analysis-readability">Readability: ${score.readability.message} (${Math.round(score.readability.ease_score)})</div>
            <div class="headlineengine-analysis-length">Length: ${score.length.message} (${score.length.length})</div>
            <div class="headlineengine-analysis-powerwords">Powerwords: ${(score.powerwords.words.length) ? score.powerwords.words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(", ") : "None" }</div>
        </div>`);
        container.html(score_el);
        container.append(analysis);
    }
    jQuery(async () => {
        const titlewrap_el = jQuery("#titlewrap");
        const headline_score_container_el = jQuery("<div id='headlineengine-score-container'></div>");
        titlewrap_el.after(headline_score_container_el);
        display_analysis(headline_score_container_el);
        jQuery("#title").on("keyup", function(e) {
            display_analysis(headline_score_container_el);
        })
    });
    
}

main();