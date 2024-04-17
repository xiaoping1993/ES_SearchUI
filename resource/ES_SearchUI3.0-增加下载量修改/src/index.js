window.onload = () => {
    //切换弹窗
    $(".cbtn").click(() => {

        if ($(".cfunction_menu").css("display") == "none") {
            $(".cfunction_text").html(`<svg t="1642130145102" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1048" width="20" height="20"><path d="M912 800a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H112a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h800zM98.272 340a10.96 10.96 0 0 1 13.6-2.72l1.456 0.928 218.56 165.6a10.144 10.144 0 0 1 1.28 15.2l-1.28 1.168-218.56 165.616A10.944 10.944 0 0 1 106.72 688a10.624 10.624 0 0 1-10.608-8.848L96 677.6V346.384c0-2.32 0.8-4.576 2.272-6.4zM912 576a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H464a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h448z m0-224a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H464a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h448z m0-224a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H112a16 16 0 0 1-16-16V144a16 16 0 0 1 16-16h800z" p-id="1049" fill="#2c2c2c"></path></svg>`)
            // $(".cfunction_menu").css("display", "block")
            $(".cfunction_menu").fadeIn();
            $(".cfunction_menu").animate({
				height: '92px',
                width: '150px'
            });
            $(".cfunction_menu").animate({
				height: '92px',
                height: '150px',
            });

        } else {
            $(".cfunction_text").html(`<svg t="1642128853875" class="icon" viewBox="0 0 1024 1024" version="1.1"
    xmlns="http://www.w3.org/2000/svg" p-id="735" width="20" height="20">
    <path
        d="M912 800a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H112a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h800zM266.752 331.312a8 8 0 0 1 8 8v345.376a8 8 0 0 1-13.664 5.648l-155.712-155.712a32 32 0 0 1 0-45.248l155.712-155.712a8 8 0 0 1 5.664-2.352zM912 576a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H464a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h448z m0-224a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H464a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h448z m0-224a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H112a16 16 0 0 1-16-16V144a16 16 0 0 1 16-16h800z"
        fill="#2c2c2c" p-id="736"></path>
</svg>`)
            // $(".cfunction_menu").css("display", "none")
            $(".cfunction_menu").animate({
                height: '0px'
            });
            $(".cfunction_menu").animate({
                width: '0px'
            });
            $(".cfunction_menu").fadeOut("slow");

        }
    })

    
    弹窗消失
    $("document").click((e) => {
        if (!$('.cfunction_text').is(e.target) && $('.cfunction_text').has(e.target).length === 0) {

            $(".cfunction_text").html(`<svg t="1642128853875" class="icon" viewBox="0 0 1024 1024" version="1.1"
    xmlns="http://www.w3.org/2000/svg" p-id="735" width="20" height="20">
    <path
        d="M912 800a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H112a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h800zM266.752 331.312a8 8 0 0 1 8 8v345.376a8 8 0 0 1-13.664 5.648l-155.712-155.712a32 32 0 0 1 0-45.248l155.712-155.712a8 8 0 0 1 5.664-2.352zM912 576a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H464a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h448z m0-224a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H464a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h448z m0-224a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H112a16 16 0 0 1-16-16V144a16 16 0 0 1 16-16h800z"
        fill="#2c2c2c" p-id="736"></path>
</svg>`)
            $(".cfunction_menu").animate({
                height: '0px'
            });
            $(".cfunction_menu").animate({
                width: '0px'
            });
            $(".cfunction_menu").fadeOut();

        }
    })
   

}