import createLogger from "logging";
import { fetchLinkBaum } from "./redis-client.js";

const logger = createLogger( "controller" );


/**
 * Routen registrieren.
 *
 * @param expressObjekt App-Objekt von Express.js
 */
export function routenRegistrieren( expressObjekt ) {

    const pfad1 = "/linkbaum/:linkbaumId";
    expressObjekt.get( pfad1, getLinkBaum );
    logger.info( `Route "${pfad1}" registriert.` );
}


/**
 * Zeigt einen Link-Baum an.
 * 
 * @param {*} request Enthält Pfad-Parameter `linkbaumId`
 * 
 * @param {*} response Nunjucks-Template "linkbaum" oder "fehler" zurückliefern
 */
async function getLinkBaum( request, response ) {

    const linkbaumId = request.params.linkbaumId;
    const linkbaum   = await fetchLinkBaum( linkbaumId );

    if ( !linkbaum ) {

        logger.warn( `Link-Baum mit ID "${linkbaumId}" nicht gefunden.` );
        response.render( "fehler", { 
                                     seitentitel: "Fehler", 
                                     fehlermeldung: `Link-Baum mit ID "${linkbaumId}" nicht gefunden.`
                                   });
        return;
    }

    logger.info( `Link-Baum mit ID "${linkbaumId}" gefunden: ${linkbaum.titel}` );
    response.render( "linkbaum", { 
                                   seitentitel: linkbaum.titel, 
                                   linkbaum: linkbaum 
                                 });
}
