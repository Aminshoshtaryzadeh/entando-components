package org.entando.entando.plugins.jacms.web.contentmodel;

import org.entando.entando.web.common.model.*;

import java.util.Optional;

public interface EntandoCrudService<T, ID> {

    T create(T entity);

    T update(T entity);

    PagedMetadata<T> findMany(RestListRequest listRequest);

    Optional<T> findById(ID id);

    void delete(ID id);
}
