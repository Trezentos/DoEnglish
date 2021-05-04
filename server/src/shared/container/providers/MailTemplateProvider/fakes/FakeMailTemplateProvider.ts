import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailtemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail Content';
  }
}
