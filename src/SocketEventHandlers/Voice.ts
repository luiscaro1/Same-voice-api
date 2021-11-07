import { Socket } from 'socket.io';
import Inject from '@/Decorators/Inject';

import VoiceLobby from '../Entities/VoiceLobby';
import { JOIN, UPDATE_VOICE_LOBBY, LEAVE, VOICE } from './Events';
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
      ({
        lid,
        userState,
        data,
      }: {
        lid: string;
        userState: { uid: string; muted: boolean };
        data: string;
      }) => {
        const newData = data.split(';');
        newData[0] = 'data:audio/ogg;';
        const res = newData[0] + newData[1];
        // if (!VoiceEvents.vlContext.voiceLobbyList[lid].userList[uid].muted)

        // if (!userState?.muted)
        socket.to(lid).emit(VOICE, res);
        // VoiceEvents.vlContext.voiceLobbyList[lid].userList[userState.uid] = {
        //   ...userState,
        // };
      }
    );

    // socket.on('disconnect', () => {});
  }
}
