/**
 * showdown.d.ts
 *
 * Provides global types for Pokemon Showdown.
 *
 */

// Showdown globals
declare const app: Showdown.ClientApp;
declare const Dex: Showdown.Dex;

// Showdown types
declare namespace Showdown {
  interface ClientApp {
    receive(data: string): void;
    send(data: string, room: string): void;
  } 
}
