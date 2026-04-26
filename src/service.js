import createLogger from "logging";

import { istLinkBaumVorhanden, setLinkBaum } from "./redis-client.js";

import { LinkEintrag } from "./LinkEintrag.js";
import { LinkBaum }    from "./LinkBaum.js";


const logger = createLogger( "service" );


/**
 * Funktion stellt sicher, dass einige Link-Bäume im Redis-Server vorhanden sind.
 */
export async function initialisiereDaten() {

    const baumSchonDa1 = await istLinkBaumVorhanden( "dhbw" );
    logger.info( "Link-Baum \"dhbw\" schon da: " + baumSchonDa1 );
    if ( baumSchonDa1 == false ) {

        const linkDhbw1 = new LinkEintrag( "Facebook" , "https://www.facebook.com/DHBWKarlsruhe"                   );
        const linkDhbw2 = new LinkEintrag( "LinkedIn" , "https://www.linkedin.com/school/dhbwkarlsruhe/posts/"     );
        const linkDhbw3 = new LinkEintrag( "Instagram", "https://www.instagram.com/dhbwkarlsruhe/"                 );
        const linkDhbw4 = new LinkEintrag( "Web-Seite", "https://www.karlsruhe.dhbw.de/startseite.html"            );
        const linkDhbw5 = new LinkEintrag( "YouTube"  , "https://www.youtube.com/channel/UCe5bTJ_lECQ7DiU_NXQMilQ" );

        const linkDhbwArray = [ linkDhbw1, linkDhbw2, linkDhbw3, linkDhbw4, linkDhbw5 ];
        const dhbwBaum = new LinkBaum( "DHBW Karlsruhe", 
                                       "Duale Hochschule Baden-Württemberg Karlsruhe", 
                                       linkDhbwArray );

        await setLinkBaum( "dhbw", dhbwBaum );
        logger.info( "Link-Baum \"dhbw\" angelegt." );
    }
}