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

    const baumSchonDa2 = await istLinkBaumVorhanden( "android" );
    logger.info( "Link-Baum \"android\" schon da: " + baumSchonDa2 );
    if ( baumSchonDa2 == false ) {

        const linkAndroid1 = new LinkEintrag( "Offizieller Android-Dev-Blog"  , "https://android-developers.googleblog.com/" );
        const linkAndroid2 = new LinkEintrag( "API-Level"                     , "https://apilevels.com/"                     );
        const linkAndroid3 = new LinkEintrag( "Android API"                   , "https://developer.android.com/reference"    );
        const linkAndroid4 = new LinkEintrag( "Nachrichten \"Android Police\"", "https://www.androidpolice.com/"             );

        const linkAndroidArray = [ linkAndroid1, linkAndroid2, linkAndroid3, linkAndroid4 ];
        const androidBaum = new LinkBaum( "Android-Programmierung",
                                          "Info-Quellen für Android-Entwickler",
                                          linkAndroidArray );

        await setLinkBaum( "android", androidBaum );
        logger.info( "Link-Baum \"android\" angelegt." );
    }
}