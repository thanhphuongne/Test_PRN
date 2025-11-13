# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY PostManagementAPI/PostManagementAPI.csproj ./PostManagementAPI/
WORKDIR /src/PostManagementAPI
RUN dotnet restore

# Copy everything else and build
WORKDIR /src
COPY PostManagementAPI/ ./PostManagementAPI/
WORKDIR /src/PostManagementAPI
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .

# Expose port
EXPOSE 8080

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "PostManagementAPI.dll"]
