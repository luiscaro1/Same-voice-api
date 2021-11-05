import express from 'express';
import Injectable from '@/Decorators/Injectable';
import Inject from '@/Decorators/Inject';
import route from '@/Decorators/Route';
import VoiceDAO from '@/Daos/Voice';

@Injectable('voiceController')
class VoiceController {
  @Inject('voiceDAO') public static voiceDAO: VoiceDAO;

  @route('GET', 'state/:id')
  public static async getVLState(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    res.json(VoiceController.voiceDAO.getVLState(req.params.id as string));
  }
}

export default VoiceController;
