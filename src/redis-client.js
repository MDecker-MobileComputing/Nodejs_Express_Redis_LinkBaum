import { createClient } from "redis";
import createLogger     from "logging";

const logger = createLogger( "redis-client" );

/** API-Objekt für Kommunikation mit Redis-Server */
let redisClient = null;


/**
 * Verbindung zu Redis-Server aufbauen.  
 */
export async function initRedisClient() {

  logger.info( "Initialisierung Redis-Client ..." );

  redisClient 
          = await createClient().
                    on( "error",        (fehler) => logger.info(( `Fehler bei Aufbau Verbindung zu Redis-Server: ${fehler}`) ).
                    on( "reconnecting", () => logger.info( "Verbindung zum Redis-Server wird wiederhergestellt ..." ) ).
                    on( "end",          () => logger.info( "Verbindung zum Redis-Server wurde geschlossen." ) ) ).
                    connect();
}


/**
 * Prüft, ob ein Link-Baum mit der gegebenen ID vorhanden ist.
 *
 * @param {string} linkBaumId ID von Link-Baum, dessen Existenz geprüft werden soll
 * 
 * @returns {Promise<boolean>} `true`, wenn der Link-Baum vorhanden ist, sonst `false`
 */
export async function istLinkBaumVorhanden( linkBaumId ) {
  
  const vorhanden = await redisClient.exists( `linkbaum:${linkBaumId}` );

  if ( vorhanden ) { return true; } else { return false; }
}


/**
 * Speichert einen Link-Baum im Redis-Server.
 *
 * @param {string} linkBaumId ID von Link-Baum, der gespeichert werden soll
 * 
 * @param {LinkBaum} linkBaumObjekt Das Link-Baum-Objekt, das gespeichert werden soll
 */
export async function setLinkBaum( linkBaumId, linkBaumObjekt ) {

  await redisClient.set( `linkbaum:${linkBaumId}`, JSON.stringify( linkBaumObjekt ) );
}


/**
 * Holt einen Link-Baum aus dem Redis-Server.
 *
 * @param {string} linkBaumId ID von Link-Baum, der geholt werden soll
 * 
 * @returns {Promise<LinkBaum|null>} Das Link-Baum-Objekt, falls vorhanden, sonst `null`
 */
export async function fetchLinkBaum( linkBaumId ) {

  const linkBaumString = await redisClient.get( `linkbaum:${linkBaumId}` );
  if ( linkBaumString ) {

    return JSON.parse( linkBaumString );

  } else {

    return null;
  }
} 