FROM node:22-bookworm

RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN javac -cp "sqlite-jdbc-3.53.4.0.jar" InventoryBridge.java
RUN javac -cp "sqlite-jdbc-3.53.4.0.jar" InventoryViewBridge.java
RUN javac -cp "sqlite-jdbc-3.53.4.0.jar" InventoryDashboardBridge.java
RUN javac -cp "sqlite-jdbc-3.53.4.0.jar" InventoryUpdateBridge.java
RUN javac -cp "sqlite-jdbc-3.53.4.0.jar" InventoryDeleteBridge.java
RUN javac -cp "sqlite-jdbc-3.53.4.0.jar" InventoryStockBridge.java
RUN javac -cp "sqlite-jdbc-3.53.4.0.jar" InventoryLowStockBridge.java
RUN javac -cp "sqlite-jdbc-3.53.4.0.jar" InventoryInitBridge.java

RUN java -cp ".:sqlite-jdbc-3.53.4.0.jar" InventoryInitBridge

EXPOSE 5000

CMD ["node", "server.js"]