import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API, HttpMethodsTypeEnum } from '@app/helpers';
import { APIManager } from '@app/core';

@Injectable()
export class ChatService {
  constructor(private apiManager: APIManager) {}

  private otherMessages = new BehaviorSubject<any>(null);
  otherMessagesEvent = this.otherMessages.asObservable();

  private messageSenderUser = new BehaviorSubject<any>(null);
  messageSenderUserEvent = this.messageSenderUser.asObservable();

  getChatContactsById = (params: any): Observable<any> => {
    const url = `${API.GET_CHAT_CONTACTS}`;
    return this.apiManager.postOrPutApis(url, params, HttpMethodsTypeEnum.POST); 
  };

  getChatContactBySenderId = (senderId:number): Observable<any> => {
    const url = `${API.GET_CHAT_CONTACT_BY_SENDER_ID}?senderId=${senderId}`;
    return this.apiManager.postOrPutApis(url, {}, HttpMethodsTypeEnum.POST); 
  };

  getChatMessages = (params: any): Observable<any> => {
    const url = `${API.GET_CHAT_MESSAGES}`;
    return this.apiManager.postOrPutApis(url, params, HttpMethodsTypeEnum.POST,false); 
  };

  addChatMessage = (params: any): Observable<any> => {
    const url = `${API.ADD_CHAT_MESSAGES}`;
    return this.apiManager.postOrPutApis(url, params, HttpMethodsTypeEnum.POST); 
  };

  sendToOthers(data:any){
    this.otherMessages.next(data);
  }
  newMessageSend(data:any){
    this.messageSenderUser.next(data)
  }

  updateChat = (id:number): Observable<any> => {
    const url = `${API.UPDATE_CHAT_MESSAGES}?senderId=${id}`;
    return this.apiManager.postOrPutApis(url, {}, HttpMethodsTypeEnum.PUT); 
  };
  conversation = (payload:any): Observable<any> => {
    const url = `${API.GET_ADD_CONVERSATION}`;
    return this.apiManager.postOrPutApis(url, payload, HttpMethodsTypeEnum.POST); 
  };
  blockOrUnBlock = (id:number,isBlock:boolean): Observable<any> => {
    const url = `${API.BLOCK_UNBLOCK_USER}?requesterId=${id}&isBlock=${isBlock}`;
    return this.apiManager.postOrPutApis(url, {}, HttpMethodsTypeEnum.PUT); 
  };


  deleteChatConversation = (id:any): Observable<any> => {
    const url = `${API.DELETE_CHAT_MESSAGES}?clientId=${id}`;
    return this.apiManager.postOrPutApis(url, {}, HttpMethodsTypeEnum.POST); 
  };
}
