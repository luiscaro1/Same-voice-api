import { Socket } from 'socket.io';
import VoiceEvents from '@/SocketEventHandlers/Voice';

export default class EventHandler {
  public static handle(socket: Socket): void {
    VoiceEvents.handle(socket);
  }
}
