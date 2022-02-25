USE [master]
GO
/****** Object:  Database [KidsHeavenDB]    Script Date: 25/02/2022 21:12:39 ******/
CREATE DATABASE [KidsHeavenDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'KidsHeavenDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\KidsHeavenDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'KidsHeavenDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\KidsHeavenDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [KidsHeavenDB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [KidsHeavenDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [KidsHeavenDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [KidsHeavenDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [KidsHeavenDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [KidsHeavenDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [KidsHeavenDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [KidsHeavenDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [KidsHeavenDB] SET  MULTI_USER 
GO
ALTER DATABASE [KidsHeavenDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [KidsHeavenDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [KidsHeavenDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [KidsHeavenDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [KidsHeavenDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [KidsHeavenDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [KidsHeavenDB] SET QUERY_STORE = OFF
GO
USE [KidsHeavenDB]
GO
/****** Object:  Schema [KidsHeavenDB]    Script Date: 25/02/2022 21:12:39 ******/
CREATE SCHEMA [KidsHeavenDB]
GO
/****** Object:  Table [KidsHeavenDB].[Achivements]    Script Date: 25/02/2022 21:12:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [KidsHeavenDB].[Achivements](
	[AchivementsId] [int] IDENTITY(1,1) NOT NULL,
	[AchivementsName] [varchar](100) NOT NULL,
	[AchivementsPhotoUrl] [varchar](max) NOT NULL,
 CONSTRAINT [Pk_Achivements_AchivementsId] PRIMARY KEY CLUSTERED 
(
	[AchivementsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [KidsHeavenDB].[Categories]    Script Date: 25/02/2022 21:12:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [KidsHeavenDB].[Categories](
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [varchar](100) NOT NULL,
 CONSTRAINT [Pk_Categories_CategoryId] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [KidsHeavenDB].[Districts]    Script Date: 25/02/2022 21:12:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [KidsHeavenDB].[Districts](
	[DistrictsId] [int] IDENTITY(1,1) NOT NULL,
	[DistrictName] [varchar](100) NOT NULL,
 CONSTRAINT [Pk_Districts_DistrictsId] PRIMARY KEY CLUSTERED 
(
	[DistrictsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [KidsHeavenDB].[MapLocations]    Script Date: 25/02/2022 21:12:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [KidsHeavenDB].[MapLocations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MapLocationsLat] [int] NOT NULL,
	[MapLocationsLng] [int] NOT NULL,
 CONSTRAINT [pk_Tbl] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [KidsHeavenDB].[Products]    Script Date: 25/02/2022 21:12:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [KidsHeavenDB].[Products](
	[ProductsId] [int] IDENTITY(1,1) NOT NULL,
	[ProductsTitle] [varchar](max) NOT NULL,
	[ProductsGender] [varchar](50) NOT NULL,
	[ProductsCategoryId] [int] NOT NULL,
	[ProductsDescription] [varchar](max) NOT NULL,
	[ProductsEmail] [varchar](100) NOT NULL,
	[ProductsPhoneNumber] [varchar](30) NOT NULL,
	[ProductsLocationId] [int] NOT NULL,
	[ProductsPhotoUrl] [varchar](max) NOT NULL,
	[ProductsPrice] [int] NOT NULL,
	[ProductsUserId] [int] NOT NULL,
 CONSTRAINT [Pk_Products_ProductsId] PRIMARY KEY CLUSTERED 
(
	[ProductsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [KidsHeavenDB].[UserAccounts]    Script Date: 25/02/2022 21:12:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [KidsHeavenDB].[UserAccounts](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserFirebaseUid] [varchar](max) NULL,
	[UserName] [varchar](100) NOT NULL,
	[UserEmail] [varchar](100) NOT NULL,
	[UserPhoneNumber] [varchar](20) NOT NULL,
	[UserPhotoUrl] [varchar](max) NULL,
	[DistrictId] [int] NOT NULL,
 CONSTRAINT [Pk_UserAccounts_UserId] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [KidsHeavenDB].[UserHasAchivements]    Script Date: 25/02/2022 21:12:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [KidsHeavenDB].[UserHasAchivements](
	[UserId] [int] NOT NULL,
	[AchivementsId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [KidsHeavenDB].[UserHasFavoriteProduct]    Script Date: 25/02/2022 21:12:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [KidsHeavenDB].[UserHasFavoriteProduct](
	[UserId] [int] NOT NULL,
	[ProductId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [KidsHeavenDB].[UserRateUser]    Script Date: 25/02/2022 21:12:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [KidsHeavenDB].[UserRateUser](
	[UserIdRated] [int] NOT NULL,
	[UserIdEvaluated] [int] NOT NULL,
	[RatedUserStars] [int] NOT NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [KidsHeavenDB].[Categories] ON 

INSERT [KidsHeavenDB].[Categories] ([CategoryId], [CategoryName]) VALUES (1, N'Calçado')
INSERT [KidsHeavenDB].[Categories] ([CategoryId], [CategoryName]) VALUES (2, N'Descanço')
INSERT [KidsHeavenDB].[Categories] ([CategoryId], [CategoryName]) VALUES (3, N'Passear')
INSERT [KidsHeavenDB].[Categories] ([CategoryId], [CategoryName]) VALUES (4, N'Roupa')
INSERT [KidsHeavenDB].[Categories] ([CategoryId], [CategoryName]) VALUES (5, N'Refeição')
INSERT [KidsHeavenDB].[Categories] ([CategoryId], [CategoryName]) VALUES (6, N'Segurança')
SET IDENTITY_INSERT [KidsHeavenDB].[Categories] OFF
GO
SET IDENTITY_INSERT [KidsHeavenDB].[Districts] ON 

INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (1, N'Lisboa')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (4, N'Porto')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (5, N'Setúbal')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (6, N'Braga')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (7, N'Aveiro')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (8, N'Faro')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (9, N'	Leiria')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (10, N'Santarém')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (11, N'Coimbra')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (12, N'	Viseu')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (13, N'Madeira')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (14, N'Açores')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (15, N'Viana do Castelo')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (16, N'Vila Real')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (17, N'Castelo Branco')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (18, N'	Évora')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (19, N'Beja')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (20, N'Guarda')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (21, N'	Bragança')
INSERT [KidsHeavenDB].[Districts] ([DistrictsId], [DistrictName]) VALUES (22, N'Portalegre')
SET IDENTITY_INSERT [KidsHeavenDB].[Districts] OFF
GO
SET IDENTITY_INSERT [KidsHeavenDB].[MapLocations] ON 

INSERT [KidsHeavenDB].[MapLocations] ([Id], [MapLocationsLat], [MapLocationsLng]) VALUES (1, 32, 32)
INSERT [KidsHeavenDB].[MapLocations] ([Id], [MapLocationsLat], [MapLocationsLng]) VALUES (2, 0, 0)
INSERT [KidsHeavenDB].[MapLocations] ([Id], [MapLocationsLat], [MapLocationsLng]) VALUES (3, 0, 0)
INSERT [KidsHeavenDB].[MapLocations] ([Id], [MapLocationsLat], [MapLocationsLng]) VALUES (4, 38, -9)
INSERT [KidsHeavenDB].[MapLocations] ([Id], [MapLocationsLat], [MapLocationsLng]) VALUES (5, 38, -9)
INSERT [KidsHeavenDB].[MapLocations] ([Id], [MapLocationsLat], [MapLocationsLng]) VALUES (6, 0, 0)
INSERT [KidsHeavenDB].[MapLocations] ([Id], [MapLocationsLat], [MapLocationsLng]) VALUES (7, 39, -5)
INSERT [KidsHeavenDB].[MapLocations] ([Id], [MapLocationsLat], [MapLocationsLng]) VALUES (8, 38, -8)
INSERT [KidsHeavenDB].[MapLocations] ([Id], [MapLocationsLat], [MapLocationsLng]) VALUES (9, 37, -7)
SET IDENTITY_INSERT [KidsHeavenDB].[MapLocations] OFF
GO
SET IDENTITY_INSERT [KidsHeavenDB].[Products] ON 

INSERT [KidsHeavenDB].[Products] ([ProductsId], [ProductsTitle], [ProductsGender], [ProductsCategoryId], [ProductsDescription], [ProductsEmail], [ProductsPhoneNumber], [ProductsLocationId], [ProductsPhotoUrl], [ProductsPrice], [ProductsUserId]) VALUES (8, N'sad', N'Rapaz', 1, N'asdas', N'zepedroduarte2004@hotmail.com', N'9325421412', 4, N'https://firebasestorage.googleapis.com/v0/b/kidsheaven-7039a.appspot.com/o/AdvertImages%2FlogoCoder.png_1644609736819?alt=media&token=fbbef1c2-804f-46a6-b8c6-a3657a102e56', 12, 31)
INSERT [KidsHeavenDB].[Products] ([ProductsId], [ProductsTitle], [ProductsGender], [ProductsCategoryId], [ProductsDescription], [ProductsEmail], [ProductsPhoneNumber], [ProductsLocationId], [ProductsPhotoUrl], [ProductsPrice], [ProductsUserId]) VALUES (11, N'faswfas', N'Rapaz', 1, N'fasfasfas', N'zepedroduarte69@gmail.com', N'9325421412', 7, N'https://firebasestorage.googleapis.com/v0/b/kidsheaven-7039a.appspot.com/o/AdvertImages%2Fc7327fd0-763c-4a87-802a-0d30c6179614.jpg_1644689416645?alt=media&token=2e5dbecd-9ba6-4eb0-adbb-c5b39bee8cc9', 12, 33)
INSERT [KidsHeavenDB].[Products] ([ProductsId], [ProductsTitle], [ProductsGender], [ProductsCategoryId], [ProductsDescription], [ProductsEmail], [ProductsPhoneNumber], [ProductsLocationId], [ProductsPhotoUrl], [ProductsPrice], [ProductsUserId]) VALUES (12, N'312ed1q2d12', N'Rapaz', 1, N'd12ed12de', N'zepedroduarte2004@hotmail.com', N'9325421412', 8, N'https://firebasestorage.googleapis.com/v0/b/kidsheaven-7039a.appspot.com/o/AdvertImages%2Fgiphy.gif_1644690325327?alt=media&token=74567682-d963-4f6d-a586-4235d1f7ab29', 12312, 33)
INSERT [KidsHeavenDB].[Products] ([ProductsId], [ProductsTitle], [ProductsGender], [ProductsCategoryId], [ProductsDescription], [ProductsEmail], [ProductsPhoneNumber], [ProductsLocationId], [ProductsPhotoUrl], [ProductsPrice], [ProductsUserId]) VALUES (13, N'teste', N'Unisexo', 1, N'teste', N'zepedroduarte2004@hotmail.com', N'9325421412', 9, N'https://firebasestorage.googleapis.com/v0/b/kidsheaven-7039a.appspot.com/o/AdvertImages%2Fimages.jpg_1645195752669?alt=media&token=6d9000d8-6f84-4fb3-b644-5537bdbcdc44', 1232, 31)
SET IDENTITY_INSERT [KidsHeavenDB].[Products] OFF
GO
SET IDENTITY_INSERT [KidsHeavenDB].[UserAccounts] ON 

INSERT [KidsHeavenDB].[UserAccounts] ([UserId], [UserFirebaseUid], [UserName], [UserEmail], [UserPhoneNumber], [UserPhotoUrl], [DistrictId]) VALUES (31, N'Iq7t9WgXNbavcVTXrTEeVA2dFqm2', N'Ze', N'string', N'937483712', N'https://firebasestorage.googleapis.com/v0/b/kidsheaven-7039a.appspot.com/o/UserPFP%2Fcu.png_1645195591384?alt=media&token=85ce3b0c-e197-4cf7-95ec-8f93c7a32c45', 1)
INSERT [KidsHeavenDB].[UserAccounts] ([UserId], [UserFirebaseUid], [UserName], [UserEmail], [UserPhoneNumber], [UserPhotoUrl], [DistrictId]) VALUES (32, N'IaV0MQKotKNBKOScoO96hs1lnKg1', N'Kaique Vinicius Alves', N'kaique.vinicius.alves@outlook.com', N'912999937', N'https://firebasestorage.googleapis.com/v0/b/kidsheaven-7039a.appspot.com/o/UserPFP%2FScreenshot_101.png_1644089155420?alt=media&token=b5d14440-7d9e-4d52-b96d-aaf3719f268d', 13)
INSERT [KidsHeavenDB].[UserAccounts] ([UserId], [UserFirebaseUid], [UserName], [UserEmail], [UserPhoneNumber], [UserPhotoUrl], [DistrictId]) VALUES (33, N'5SkgdKXcDPhF5KpviQwzAifXKO63', N'Ze Pedro ', N'string', N'9325421412', N'https://firebasestorage.googleapis.com/v0/b/kidsheaven-7039a.appspot.com/o/UserPFP%2FScreenshot_3.png_1644689241305?alt=media&token=91877efb-6782-4e95-97f0-3dcda0fb252f', 1)
SET IDENTITY_INSERT [KidsHeavenDB].[UserAccounts] OFF
GO
ALTER TABLE [KidsHeavenDB].[Products]  WITH CHECK ADD  CONSTRAINT [fk_products_categories] FOREIGN KEY([ProductsCategoryId])
REFERENCES [KidsHeavenDB].[Categories] ([CategoryId])
GO
ALTER TABLE [KidsHeavenDB].[Products] CHECK CONSTRAINT [fk_products_categories]
GO
ALTER TABLE [KidsHeavenDB].[Products]  WITH CHECK ADD  CONSTRAINT [fk_products_maplocations] FOREIGN KEY([ProductsLocationId])
REFERENCES [KidsHeavenDB].[MapLocations] ([Id])
GO
ALTER TABLE [KidsHeavenDB].[Products] CHECK CONSTRAINT [fk_products_maplocations]
GO
ALTER TABLE [KidsHeavenDB].[Products]  WITH CHECK ADD  CONSTRAINT [fk_products_useraccounts] FOREIGN KEY([ProductsUserId])
REFERENCES [KidsHeavenDB].[UserAccounts] ([UserId])
GO
ALTER TABLE [KidsHeavenDB].[Products] CHECK CONSTRAINT [fk_products_useraccounts]
GO
ALTER TABLE [KidsHeavenDB].[UserAccounts]  WITH CHECK ADD  CONSTRAINT [fk_useraccounts_districts] FOREIGN KEY([DistrictId])
REFERENCES [KidsHeavenDB].[Districts] ([DistrictsId])
GO
ALTER TABLE [KidsHeavenDB].[UserAccounts] CHECK CONSTRAINT [fk_useraccounts_districts]
GO
ALTER TABLE [KidsHeavenDB].[UserHasAchivements]  WITH CHECK ADD  CONSTRAINT [fk_userhasachivements] FOREIGN KEY([AchivementsId])
REFERENCES [KidsHeavenDB].[Achivements] ([AchivementsId])
GO
ALTER TABLE [KidsHeavenDB].[UserHasAchivements] CHECK CONSTRAINT [fk_userhasachivements]
GO
ALTER TABLE [KidsHeavenDB].[UserHasAchivements]  WITH CHECK ADD  CONSTRAINT [fk_UserId] FOREIGN KEY([UserId])
REFERENCES [KidsHeavenDB].[UserAccounts] ([UserId])
GO
ALTER TABLE [KidsHeavenDB].[UserHasAchivements] CHECK CONSTRAINT [fk_UserId]
GO
ALTER TABLE [KidsHeavenDB].[UserHasFavoriteProduct]  WITH CHECK ADD  CONSTRAINT [fk_userhasfavoriteproduct] FOREIGN KEY([ProductId])
REFERENCES [KidsHeavenDB].[Products] ([ProductsId])
GO
ALTER TABLE [KidsHeavenDB].[UserHasFavoriteProduct] CHECK CONSTRAINT [fk_userhasfavoriteproduct]
GO
ALTER TABLE [KidsHeavenDB].[UserHasFavoriteProduct]  WITH CHECK ADD  CONSTRAINT [fk_usershasfavoriteproduct] FOREIGN KEY([UserId])
REFERENCES [KidsHeavenDB].[UserAccounts] ([UserId])
GO
ALTER TABLE [KidsHeavenDB].[UserHasFavoriteProduct] CHECK CONSTRAINT [fk_usershasfavoriteproduct]
GO
ALTER TABLE [KidsHeavenDB].[UserRateUser]  WITH CHECK ADD  CONSTRAINT [fk_userrateduser_useraccounts] FOREIGN KEY([UserIdEvaluated])
REFERENCES [KidsHeavenDB].[UserAccounts] ([UserId])
GO
ALTER TABLE [KidsHeavenDB].[UserRateUser] CHECK CONSTRAINT [fk_userrateduser_useraccounts]
GO
ALTER TABLE [KidsHeavenDB].[UserRateUser]  WITH CHECK ADD  CONSTRAINT [fk_userrateuser_useraccounts] FOREIGN KEY([UserIdRated])
REFERENCES [KidsHeavenDB].[UserAccounts] ([UserId])
GO
ALTER TABLE [KidsHeavenDB].[UserRateUser] CHECK CONSTRAINT [fk_userrateuser_useraccounts]
GO
USE [master]
GO
ALTER DATABASE [KidsHeavenDB] SET  READ_WRITE 
GO
