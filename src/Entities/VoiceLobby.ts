class VoiceLobby {
  public userList: { [uid: string]: { muted: boolean } };

  public lid: string;

  constructor(lid: string) {
    this.userList = {};
    this.lid = lid;
  }

  public muteUser(uid: string): void {
    this.userList[uid].muted = true;
  }

  public addUser(uid: string): void {
    this.userList[uid] = {
      muted: false,
    };
  }

  public removeUser(uid: string): void {
    delete this.userList[uid];
  }

  public json(): any {
    return {
      userList: this.userList,
      lid: this.lid,
    };
  }
}

export default VoiceLobby;
