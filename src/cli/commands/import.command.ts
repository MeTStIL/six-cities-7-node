import { ICommand } from './command.interface';
import {
  ConsoleLogger,
  createOffer,
  DefaultOfferService,
  DefaultUserService,
  getMongoUri,
  IDatabaseClient,
  ILogger,
  IOfferService,
  IUserService,
  MongoDatabaseClient,
  OfferModel,
  TRentalOffer,
  TsvFileReader,
  UserModel,
} from '../../shared';
import chalk from 'chalk';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant';
import { isAvailableAmenity } from '../../shared/guards';

export class ImportCommand implements ICommand {
  private userService: IUserService;
  private offerService: IOfferService;
  private databaseClient: IDatabaseClient;
  private readonly logger: ILogger;
  private salt!: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: TRentalOffer) {
    const user = await this.userService.findOrCreate(
      {
        ...offer.author,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt,
    );

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      city: offer.city ?? 'Paris',
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      housingType: offer.housingType ?? 'house',
      rooms: offer.rooms,
      maxGuests: offer.maxGuests,
      price: offer.price,
      amenities: offer.amenities.filter(Boolean).filter((item) => isAvailableAmenity(item!)),
      authorId: user.id,
      location: offer.location,
    });
  }

  private onCompleteImport(count: number) {
    console.info(chalk.green(`\n${count} rows imported.`));
  }

  public async execute(
    filename: string,
    username: string,
    password: string,
    host: string,
    dbName: string,
    salt: string,
  ): Promise<void> {
    const uri = getMongoUri({ username, password, host, dbName, port: DEFAULT_DB_PORT });
    this.salt = salt;

    await this.databaseClient.connect(uri);
    const fileReader = new TsvFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    await fileReader.read();
  }
}
