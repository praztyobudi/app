import * as fromIdeRepo from '../../../repo/speak/ide/ide_repo.js';
import { getDepartmentName } from '../../../helper/find_department.js';

class IdeService {
    async findAllIde() {
        return await fromIdeRepo.ideRepo.getAllIde();
    }
    async findIdeById(id) {
        const ide = await fromIdeRepo.ideRepo.getIdeById(id);
        if (!ide) throw new Error('Idea not found');
        return ide;
    }
    async createIde(ide) {
        return await fromIdeRepo.ideRepo.createIde(ide);
    }
    async updateIde(id, data) {
        // Cari ID dari nama departemen
        const depId = await getDepartmentName({ departmentName: data.department });
        if (!depId) {
            throw new Error(`Department "${data.department}" not found`);
        }
        const updateIde = {
            ...data,
            department: depId
          };
     
        return await fromIdeRepo.ideRepo.updateIde(id, updateIde);
    }
    async deleteIde(id) {
        // opsional: cek ide dulu
        const ide = await fromIdeRepo.ideRepo.getIdeById(id);
        if (!ide) return null;
        // jika ada, hapus ide
        const deleted = await fromIdeRepo.ideRepo.deleteIdeById(id);
        if (!deleted) return null;
        const { message, ...ideWithoutMessage } = ide;
        // mengembalikan ide tanpa pesan
        return ideWithoutMessage;
    }
    

    
}

export default new IdeService();
