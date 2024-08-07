USE [master]
GO
/****** Object:  Database [KidsHeavenDB]    Script Date: 18/05/2022 22:42:52 ******/
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
/****** Object:  Schema [KidsHeavenDB]    Script Date: 18/05/2022 22:42:52 ******/
CREATE SCHEMA [KidsHeavenDB]
GO
/****** Object:  Table [KidsHeavenDB].[Achivements]    Script Date: 18/05/2022 22:42:52 ******/
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
/****** Object:  Table [KidsHeavenDB].[Categories]    Script Date: 18/05/2022 22:42:52 ******/
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
/****** Object:  Table [KidsHeavenDB].[Districts]    Script Date: 18/05/2022 22:42:52 ******/
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
/****** Object:  Table [KidsHeavenDB].[MapLocations]    Script Date: 18/05/2022 22:42:52 ******/
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
/****** Object:  Table [KidsHeavenDB].[Products]    Script Date: 18/05/2022 22:42:52 ******/
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
/****** Object:  Table [KidsHeavenDB].[UserAccounts]    Script Date: 18/05/2022 22:42:52 ******/
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
/****** Object:  Table [KidsHeavenDB].[UserHasAchivements]    Script Date: 18/05/2022 22:42:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [KidsHeavenDB].[UserHasAchivements](
	[UserId] [int] NOT NULL,
	[AchivementsId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [KidsHeavenDB].[UserHasFavoriteProduct]    Script Date: 18/05/2022 22:42:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [KidsHeavenDB].[UserHasFavoriteProduct](
	[UserId] [int] NOT NULL,
	[ProductId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [KidsHeavenDB].[UserRateUser]    Script Date: 18/05/2022 22:42:52 ******/
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
ALTER TABLE [KidsHeavenDB].[Products]  WITH CHECK ADD  CONSTRAINT [fk_products_categories] FOREIGN KEY([ProductsCategoryId])
REFERENCES [KidsHeavenDB].[Categories] ([CategoryId])
GO
ALTER TABLE [KidsHeavenDB].[Products] CHECK CONSTRAINT [fk_products_categories]
GO
ALTER TABLE [KidsHeavenDB].[Products]  WITH CHECK ADD  CONSTRAINT [fk_products_maplocations] FOREIGN KEY([ProductsLocationId])
REFERENCES [KidsHeavenDB].[MapLocations] ([Id])
ON DELETE CASCADE
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
