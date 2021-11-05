import Inject from '@/Decorators/Inject';
import Injectable from '@/Decorators/Injectable';
import VoiceLobbyContext from '@/VoiceLobbyContext';

@Injectable('voiceDAO')
class VoiceDAO {
  @Inject('vlContext') public vlContext!: VoiceLobbyContext;

  public getVLState(lid: string): { [param: string]: any } | string {
    if (this.vlContext.voiceLobbyList[lid])
      return this.vlContext.voiceLobbyList[lid].json().userList;
    return {};
  }
}

export default VoiceDAO;
