import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Modal from "../../../../../components/ui/Modal/Modal.jsx";
import Button from "../../../../../components/ui/Button/Button.jsx";

export default function AssignAdminModal({
  open,
  onClose,
  onAssign,
  adminList,
  currentAdminId,
  isLoading,
  isBusy,
  errorMessage,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!open) {
      setSearchTerm("");
      return undefined;
    }
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const currentAdmin = useMemo(
    () => (currentAdminId ? adminList.find((a) => a.id === currentAdminId) : null),
    [adminList, currentAdminId]
  );

  const filteredAdmins = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const others = adminList.filter((a) => a.id !== currentAdminId);
    if (!term) return others;
    return others.filter((admin) => admin.name.toLowerCase().includes(term));
  }, [adminList, currentAdminId, searchTerm]);

  const renderAdminRow = (admin, isCurrent = false) => (
    <div
      key={admin.id}
      className={`grid grid-cols-12 gap-4 py-3 border-b items-center ${isCurrent ? "border-primary/30 bg-primary/5" : "border-base-200"
        }`}
    >
      <div className="col-span-3">
        <span className="text-body text-base-content">
          {admin.name}
        </span>
      </div>
      <div className="col-span-6 flex justify-center">
        <span className="text-body text-base-content font-medium">
          {admin.workforceCount ?? admin.requestCount ?? 0}
        </span>
      </div>
      <div className="col-span-3 flex justify-end">
        <Button
          variant={isCurrent ? "outline" : "secondary"}
          label={isCurrent ? "Selecionado" : isBusy ? "Atribuindo..." : "Escolher"}
          onClick={() => !isCurrent && onAssign(admin)}
          className="w-auto"
          disabled={isCurrent || isBusy}
        />
      </div>
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} title="Selecionar Administrador" className="max-w-3xl w-full">
      <div className="space-y-6 min-h-[420px] max-h-[520px] overflow-y-auto p-2">
        {errorMessage && (
          <div className="alert alert-error shadow">
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="w-full">
          <input
            type="text"
            className="input input-bordered w-full text-body"
            placeholder="Pesquisar administrador..."
            style={{ borderRadius: "0.5rem" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-12 gap-4 border-b border-base-300 pb-3">
          <div className="col-span-3">
            <span className="text-label font-semibold text-base-content">Responsável</span>
          </div>
          <div className="col-span-6 text-center">
            <span className="text-label font-semibold text-base-content">
              Total de mão de obra
            </span>
          </div>
          <div className="col-span-3" />
        </div>

        {isLoading ? (
          <div className="py-6 text-center text-base-content/70">Carregando administradores...</div>
        ) : (
          <div className="space-y-0">
            {currentAdmin && renderAdminRow(currentAdmin, true)}
            {filteredAdmins.length === 0 && !currentAdmin ? (
              <div className="py-6 text-center text-base-content/70">Nenhum administrador disponível.</div>
            ) : (
              filteredAdmins.map((admin) => renderAdminRow(admin, false))
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

AssignAdminModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAssign: PropTypes.func.isRequired,
  adminList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      requestCount: PropTypes.number,
      workforceCount: PropTypes.number,
    })
  ),
  currentAdminId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoading: PropTypes.bool,
  isBusy: PropTypes.bool,
  errorMessage: PropTypes.string,
};

AssignAdminModal.defaultProps = {
  adminList: [],
  currentAdminId: null,
  isLoading: false,
  isBusy: false,
  errorMessage: null,
};
