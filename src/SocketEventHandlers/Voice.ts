import { Socket } from 'socket.io';
import Inject from '@/Decorators/Inject';

import VoiceLobby from '../Entities/VoiceLobby';
import {
  JOIN,
  UPDATE_VOICE_LOBBY,
  LEAVE,
  VOICE,
  RECEIVE_VOICE,
} from './Events';
import VoiceLobbyContext from '../VoiceLobbyContext';

export default class VoiceEvents {
  @Inject('vlContext') public static vlContext: VoiceLobbyContext;

  public static handle(socket: Socket): void {
    socket.onAny((eventName, args) => {
      console.log({ eventName, args });
    });

    socket.on(JOIN, ({ uid, lid }) => {
      if (!VoiceEvents.vlContext.voiceLobbyList[lid])
        VoiceEvents.vlContext.addLobby(new VoiceLobby(lid));
      socket.join(lid);
      VoiceEvents.vlContext.voiceLobbyList[lid].addUser(uid);
      socket.nsp.to(lid).emit(UPDATE_VOICE_LOBBY);
    });

    socket.on(LEAVE, ({ uid, lid }) => {
      if (!VoiceEvents.vlContext.voiceLobbyList[lid]) return;
      VoiceEvents.vlContext.voiceLobbyList[lid].removeUser(uid);
      console.log(VoiceEvents.vlContext.voiceLobbyList[lid]);
      socket.nsp.to(lid).emit(UPDATE_VOICE_LOBBY);
      socket.leave(lid);
    });

    socket.on(
      VOICE,
      ({ lid, uid, data }: { lid: string; uid: string; data: string }) => {
        if (!VoiceEvents.vlContext.voiceLobbyList[lid].userList[uid].muted)
          socket.emit(RECEIVE_VOICE, data);
      }
    );

    // socket.on('disconnect', () => {});
  }
}
