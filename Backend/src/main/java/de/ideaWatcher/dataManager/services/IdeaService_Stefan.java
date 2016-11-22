package main.java.de.ideaWatcher.dataManager.services;

import com.mongodb.BasicDBObject;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import org.bson.Document;
import org.bson.types.ObjectId;

/**
 * Created by Stefan on 21.11.2016.
 */
public class IdeaService_Stefan {

//    public IIdea getIdea(String ideaId) throws Exception{
//        try{
//            if (!dbConnectionService.isOpen()) {
//                dbConnectionService.openConnection();
//            }
//            Document ideasDoc = dbConnectionService.getCollection()
//                    .find(new BasicDBObject("_id", new ObjectId
//                            (ideaId))).first();
//            if (ideasDoc != null) {
//                return buildIdea(ideasDoc);
//            } else {
//                throw new Exception("ideaIdNotExist");
//            }
//        } catch (Exception ex) {
//            throw new Exception(ex);
//        } finally {
//            dbConnectionService.closeConnection();
//        }
//    }

}
