var Nightmare = require('nightmare')

var letstry = function(){
    let nightmare = Nightmare({show:true});
    nightmare
        .goto('https://membership.bluetorino.eu/account/login/')
        .type('#id_username', '---USERNAME---')
        .type('.article #id_password', '---PASSWORD---')
        .click('button[value="Log in"]')
        .wait(5000)
        .then(() => {
            nightmare
                .goto('https://membership.bluetorino.eu/account/reservations/11988/parkreservation/')
                .select('#id_station', 'caselletorinese-stradasanmaurizio-aeroportosandropertini')
                .click('#reserve-button')
                .wait(5000)
                .evaluate(() => {
                    return document.body.innerHTML;
                })
                .then(body => {
                    nightmare
                        .end()
                        .then(()=>{});
                    if(body.match(/An error occurred while reserving your parking space: No available parking space on station Caselle Torinese\/Strada San Maurizio\/Aeroporto Sandro Pertini/)){
                        console.log((new Date().toLocaleString()) + " - Nessun parcheggio, riprovo tra poco...")
                        setTimeout(letstry, 10000)
                    }else{
                        console.log("=========================\n", body, "=======================");
                        console.log("PRENOTATO!!!!")
                    }
                })
                .catch(err => {
                    console.log(err);
                    process.exit(1);
                });;
        })
        .catch(err => {
            console.log(err);
            process.exit(1);
        });
}
letstry();
