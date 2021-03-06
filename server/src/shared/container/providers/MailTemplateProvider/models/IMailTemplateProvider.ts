import IPaseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IPaseMailTemplateDTO): Promise<string>;
}
