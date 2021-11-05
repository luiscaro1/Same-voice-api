import VoiceLobby from '@/Entities/VoiceLobby';
import Injectable from './Decorators/Injectable';

@Injectable('vlContext')
class VoiceLobbyContext {
  public voiceLobbyList: { [field: string | number]: VoiceLobby };

  constructor() {
    this.voiceLobbyList = {};
  }

  public addLobby(lobby: VoiceLobby): void {
    this.voiceLobbyList[lobby.lid] = lobby;
  }

  public removeLobby(lid: string): void {
    delete this.voiceLobbyList[lid];
  }
}

export default VoiceLobbyContext;
