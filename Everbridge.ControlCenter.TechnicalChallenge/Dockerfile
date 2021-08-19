#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
ARG buildConfiguration

# VS in fast mode only builds base - use release mode to use non-development server for web app
FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 443
RUN apt-get update -y && apt-get install curl -yq
RUN curl -fsSL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get update -y && apt-get install nodejs -yq
RUN nodejs -v
RUN npm -v

FROM node:15.8-alpine AS clientbase
ARG skip_client_build=false 
WORKDIR /app 
COPY DoorManagementSystem/ClientApp/package*.json .
RUN npm install

FROM clientbase AS client
COPY DoorManagementSystem/ClientApp .
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["DoorManagementSystem/DoorManagementSystem.csproj", "DoorManagementSystem/"]
RUN dotnet restore "DoorManagementSystem/DoorManagementSystem.csproj"
COPY . .
WORKDIR "/src/DoorManagementSystem"
RUN dotnet build "DoorManagementSystem.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DoorManagementSystem.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS final-release
WORKDIR /app
EXPOSE 443
COPY --from=publish /app/publish .
COPY --from=client /app/build ./ClientApp/build

FROM base AS final-debug
WORKDIR /app
EXPOSE 443
COPY --from=publish /app/publish .
COPY --from=client /app/build ./ClientApp/build
COPY DoorManagementSystem/ClientApp .

FROM final-${buildConfiguration} AS final
WORKDIR /app
ARG buildConfiguration
RUN echo "Build Configuration: $buildConfiguration"
ENTRYPOINT ["dotnet", "DoorManagementSystem.dll"]
