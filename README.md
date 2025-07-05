# TODO
~~1. Appen skal hedde MuseoLocalRadio~~
~~2. Ret URL'en~~ 
~~3. Brug Ikon fra socialie medier~~
~~4. Fjern øverste linje med order index~~
~~5. Spiller ikke på Android~~
6. Forkert ikon på Android

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Byg MuseoPlayerApp

### Til Android
```bash
npx eas build -p android```

## Generer key

```bash
keytool -genkeypair -v -keystore museoplayer-key.jks -keyalg RSA -keysize 2048 -validity -validity 10000 -alias museoplayerAppKey```

password: Magnus0605

## Generer apks file fra abb
```bash
java -jar bundletool-all-1.18.1.jar build-apks --bundle=MuseoPlayerApp.aab --output=MuseoPlayerApp.apks --mode=universal --ks=museoplayer-key.jks --ks-key-alias=museoplayerAppKey --ks-pass=pass:Magnus0605
```   
```unzip MuseoPlayerApp.apks -d ./museo-package```

## Kopiere apk file til Android
1. i en browser naviger til https://limewire.com
2. drag and drop museolocalradio.apk til upload feltet i browseren (museolocalradio.apk omdøbes i ./museo-package/universal.apk)
3. efter endt upload, tryk på 'share' knappen
4. scan QR-kode med telefon
5. vælg filen og klik på download
