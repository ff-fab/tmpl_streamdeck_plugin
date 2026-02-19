import streamDeck from '@elgato/streamdeck';

import { Counter } from './actions/counter';

// Register all actions before connecting.
// https://docs.elgato.com/streamdeck/sdk/guides/actions
streamDeck.actions.registerAction(new Counter());

// Connect to Stream Deck — always call this last.
streamDeck.connect();
